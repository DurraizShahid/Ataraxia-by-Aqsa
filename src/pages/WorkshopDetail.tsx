import { useParams, Link } from "react-router-dom";
import Workshops from "./Workshops";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const WorkshopDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      <div className="container mx-auto px-4 pt-10">
        <Button asChild variant="ghost" className="-ml-2">
          <Link to="/workshops">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Link>
        </Button>
        {slug ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Interest captured for: <span className="font-medium text-foreground">{slug}</span>
          </p>
        ) : null}
      </div>
      <Workshops />
    </div>
  );
};

export default WorkshopDetail;

