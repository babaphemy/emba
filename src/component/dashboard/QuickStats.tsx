import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const QuickStats = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-primary">Academic Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Attendance</p>
          <div className="flex items-center gap-2">
            <Progress value={95} className="h-2 flex-1" />
            <span className="text-sm font-bold">NA</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Current Grade</p>
          <div className="flex items-center gap-2">
            <Progress value={87} className="h-2 flex-1 [&>div]:bg-purple-500" />
            <span className="text-sm font-bold">NA</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Assignments Completed
          </p>
          <div className="flex items-center gap-2">
            <Progress value={78} className="h-2 flex-1 [&>div]:bg-green-500" />
            <span className="text-sm font-bold">NA</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
