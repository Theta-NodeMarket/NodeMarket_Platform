import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

interface cardProps {
  cardDisplayValue: string;
  cardDisplayTitle: string;
}

export default function DashboardDisplayCard(props: cardProps) {
  return (
    <Card
      sx={{
        background: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        border: "solid 1px rgba(250, 250, 250, .25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "10em",
        minHeight: "2em",
        whiteSpace: "nowrap",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">{props.cardDisplayValue}</Typography>
        <Typography variant="body1">{props.cardDisplayTitle}</Typography>
      </CardContent>
    </Card>
  );
}
