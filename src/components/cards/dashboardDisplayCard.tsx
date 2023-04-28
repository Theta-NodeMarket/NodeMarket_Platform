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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "15em",
        minHeight: "10em",
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
