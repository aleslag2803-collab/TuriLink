import { Card } from "@/components/ui/card"
import { Skeleton } from "../../../components/ui/skeleton"


export default function GuideProfileLoading() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
      <div>
        <Skeleton className="h-10 w-96 mb-2" />
        <Skeleton className="h-6 w-[500px]" />
      </div>

      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-1 flex-1 mx-4" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-1 flex-1 mx-4" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>

      <Card className="p-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="space-y-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Card>
    </div>
  )
}
