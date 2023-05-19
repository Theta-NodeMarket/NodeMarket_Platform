import React, { useEffect, useRef, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Container,
  Card,
  Typography,
  Box,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import hljs from "highlight.js/lib/common";
import "highlight.js/styles/monokai-sublime.css";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Roles, withRole } from "@/lib/withRole";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const IntroductionSectionTextPart1 =
  "Getting started with NodeMarket is easy. We recommend that you have some HTML and CSS experience but being an expert is not required. Before we get started, be sure to check that you have access to the default HTML file (usually “index.html” or “default.htm”) for your website and have the ability to edit it.";
const IntroductionSectionTextPart2 =
  "While developing the NodeMarket platform, we opted to leave the positioning and styling of advertisements in your hands. Giving you full control on where and how to show advertisements on your website. NodeMarket’s servers will handle delivering advertisements, while you are responsible for adding our script to your default HTML file and <div> tags with our special class anywhere you want to display advertisements.";

const GettingStartedSectionTextPart1 =
  "To get started, copy the code provided below and paste it into the bottom of the <body> tag in your default HTML file. This script is unique to you and takes care of giving you credit for the advertisements you promote.";
const GettingStartedSectionTextPart2 =
  "Once this script is in your code, it will automatically request advertisements on your behalf. All that is left to do is copy and paste the code provided below, anywhere you would like to display advertisements.";
const GettingStartedSectionTextPart3 =
  "That's it. You are now all set to start earning TFUEL with the advertisements now displaying on your website.";
const GettingStartedSectionTextPart4 =
  "If you are having trouble setting advertisements up, see the examples below. If you are still having trouble, please reach out via email.";

const CopyTextButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: (text: string) => void;
}) => {
  const handleClick = () => {
    navigator.clipboard.writeText(text);
    onClick?.(text);
  };
  return (
    <IconButton
      style={{ position: "absolute", right: 8, top: 8 }}
      onClick={handleClick}
    >
      <ContentCopyIcon />
    </IconButton>
  );
};

function Documentation({ url }: { url: string }) {
  const user = useUser();
  const userId = useRef(user?.id);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    if (user?.id) userId.current = user.id;
  }, [user]);

  const handleClickCopy = (text: string) => {
    setSnackOpen(true);
  };

  const scriptCode = `<script defer src="${url}/api/scripts/${
    userId.current ?? "{your id}"
  }"></script>`;

  const divCode = `<div class="theta-ad"></div>`;

  const exampleCode = `<!DOCTYPE html>
<html lang="en">
<head>
\t<meta charset="UTF-8" />
\t<meta name="viewport" content="width=device-width, initial-scale=1.0" />
\t<title>Your Website Title</title>
\t<!--Add this script tag to retrieve advertisements and get credit for promoting them. -->
\t${scriptCode}
</head>
<body>
\t<div class="theta-ad"></div>
\t<!--Add as many of these divs to your code to display advertisements-->
\t<div class="new-section">
\t\t<div>
\t\t\t<h1>Hello NodeMarket!</h1>
\t\t</div>
\t</div>
</body>
</html>`;

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("pre code").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  return (
    <Container fixed>
      <Card
        sx={{
          background:
            "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          border: "solid 1px rgba(250, 250, 250, .25)",
          display: "flex",
          padding: "24px",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
        }}
      >
        <Typography typography={"h5"} width={"100%"}>
          Introduction
        </Typography>

        <Typography typography={"h6"} fontWeight={100} width={"100%"}>
          {IntroductionSectionTextPart1}

          {IntroductionSectionTextPart2}
        </Typography>

        <Typography typography={"h5"} width={"100%"}>
          Get started
        </Typography>

        <Typography typography={"h6"} fontWeight={100} width={"100%"}>
          {GettingStartedSectionTextPart1}
        </Typography>

        <Box
          bgcolor={"#181818"}
          position={"relative"}
          border={"solid 1px rgba(250, 250, 250, .25)"}
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          p={0}
        >
          <pre style={{ width: "100%" }}>
            <code className="html">{scriptCode}</code>
          </pre>
          <CopyTextButton text={scriptCode} onClick={handleClickCopy} />
        </Box>

        <Typography typography={"h6"} fontWeight={100} width={"100%"}>
          {GettingStartedSectionTextPart2}
        </Typography>

        <Box
          bgcolor={"#181818"}
          position={"relative"}
          border={"solid 1px rgba(250, 250, 250, .25)"}
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          p={0}
        >
          <pre style={{ width: "100%" }}>
            <code className="html">{divCode}</code>
          </pre>
          <CopyTextButton text={divCode} onClick={handleClickCopy} />
        </Box>

        <Typography typography={"h6"} fontWeight={100} width={"100%"}>
          {GettingStartedSectionTextPart3}
        </Typography>

        <Typography typography={"h6"} fontWeight={100} width={"100%"}>
          {GettingStartedSectionTextPart4}
        </Typography>

        <Box
          bgcolor={"#181818"}
          border={"solid 1px rgba(250, 250, 250, .25)"}
          display={"flex"}
          position={"relative"}
          alignItems={"center"}
          width={"100%"}
          p={0}
        >
          <pre style={{ width: "100%" }}>
            <code className="html" style={{ width: "100%" }}>
              {exampleCode}
            </code>
          </pre>
          <CopyTextButton text={exampleCode} onClick={handleClickCopy} />
        </Box>
      </Card>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => setSnackOpen(false)}
        message="Text Copied!"
      />
    </Container>
  );
}

const WrappedDocumentation = withRole(
  Documentation,
  Roles.Promoter,
  "/dashboard"
);

export const getServerSideProps: GetServerSideProps<{ url: string }> = async (
  context
) => {
  const host = context.req.headers.host ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http://" : "https://";
  const url = protocol + host;
  return { props: { url } };
};

export default function DocsPage({
  url,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DashboardLayout>
      <WrappedDocumentation url={url} />
    </DashboardLayout>
  );
}
