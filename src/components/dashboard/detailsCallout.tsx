import { MAINGREEN, MAINRED, MAINWHITE, MAINYELLOW } from "@/utils/consts";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";

interface DetailsCalloutProps {
  label: string;
  content: string;
  hasLink?: boolean;
  hasStatus?: boolean;
}

export function DetailsCallout(props: DetailsCalloutProps) {
  const GetColor = () => {
    if (!props.hasStatus) return MAINWHITE;

    switch (props.content.toLowerCase()) {
      case "approved":
        return MAINGREEN;
      case "pending":
        return MAINYELLOW;
      case "deactivated":
        return MAINRED;
      case "rejected":
        return MAINRED;
    }
  };

  return (
    <Stack direction={"row"} spacing={"6px"} alignItems={"center"}>
      <Typography variant="h6">{props.label}:</Typography>
      {props.hasLink ? (
        <Typography variant="body1">
          <Link href={props.content}>{props.content}</Link>
        </Typography>
      ) : (
        <Typography variant="body1" color={GetColor()}>
          {props.content}
        </Typography>
      )}
    </Stack>
  );
}
