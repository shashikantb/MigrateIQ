import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecommendationClient } from "./client"

export default function RecommendationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">AI Recommendation Engine</CardTitle>
        <CardDescription>
          Leverage AI to generate migration blueprints and suggest automated fixes for potential issues.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecommendationClient />
      </CardContent>
    </Card>
  )
}
