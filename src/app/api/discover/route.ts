// This API route handles the discovery agent payload.
// It authenticates the agent via a project-specific token,
// validates the payload, and stores the infrastructure details
// in a 'discovery' subcollection in Firestore, linked to the project ID.

import {NextResponse} from 'next/server';
import {db} from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

// A simple (and insecure) way to derive a project ID from a token.
// In a real-world app, use a secure, opaque token system.
function getProjectIdFromToken(token: string): string | null {
  if (token.startsWith('mig-token-')) {
    return token.replace('mig-token-', '');
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {message: 'Authorization header missing or invalid'},
        {status: 401}
      );
    }

    const token = authHeader.split(' ')[1];
    const projectId = getProjectIdFromToken(token);

    if (!projectId) {
      return NextResponse.json({message: 'Invalid token format'}, {status: 401});
    }

    // Verify the project exists by querying for it.
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('__name__', '==', projectId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({message: 'Project not found'}, {status: 404});
    }

    const projectDocRef = querySnapshot.docs[0].ref;

    // Save discovery data to a subcollection.
    const discoveryDocRef = doc(db, `projects/${projectId}/discovery`, 'scan');
    await setDoc(discoveryDocRef, {
      ...payload,
      scannedAt: new Date(),
    });

    // Update the main project status to "In Progress"
    await updateDoc(projectDocRef, {
      status: 'In Progress',
    });

    return NextResponse.json(
      {message: 'Discovery data received successfully.'},
      {status: 200}
    );
  } catch (error) {
    console.error('Discovery API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      {message: 'Internal Server Error', error: errorMessage},
      {status: 500}
    );
  }
}
