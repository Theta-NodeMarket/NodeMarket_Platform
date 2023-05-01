import { Container, Card, Typography, Box } from "@mui/material";
import styles from "./documentation.module.scss";

const IntroductionSectionTextPart1 = "Getting started with NodeMarket is easy. We recommend that you have some HTML and CSS experience but being an expert is not required. Before we get started, be sure to check that you have access to the default HTML file (usually “index.html” or “default.htm”) for your website and have the ability to edit it.";
const IntroductionSectionTextPart2 = "While developing the NodeMarket platform, we opted to leave the positioning and styling of advertisements in your hands. Giving you full control on where and how to show advertisements on your website. NodeMarket’s servers will handle delivering advertisements, while you are responsible for adding our script to your default HTML file and <div> tags with our special class anywhere you want to display advertisements.";

const GettingStartedSectionTextPart1 = "To get started, copy the code provided below and paste it into the bottom of the <body> tag in your default HTML file. This script is unique to you and takes care of giving you credit for the advertisements you promote.";
const GettingStartedSectionTextPart2 = "Once this script is in your code, it will automatically request advertisements on your behalf. All that is left to do is copy and paste the code provided below, anywhere you would like to display advertisements.";
const GettingStartedSectionTextPart3 = "That‘s it. You are now all set to start earning TFUEL with the advertisements now displaying on your website.";
const GettingStartedSectionTextPart4 = "If you are having trouble setting advertisements up, see the examples below. If you are still having trouble, please reach out via email.";

export function Documentation()
{
    return (
        <Container fixed>
            <Card
            sx={{
                background: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                border: "solid 1px rgba(250, 250, 250, .25)",
                display: "flex",
                padding: "24px",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
            }}>
                <Typography typography={"h5"} width={"100%"}>
                    Introduction
                </Typography>

                <Typography typography={"h6"} fontWeight={100} width={"100%"}>
                    {IntroductionSectionTextPart1}
                    <br/>
                    <br/>
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
                    border={"solid 1px rgba(250, 250, 250, .25)"} 
                    borderRadius={"5px"}
                    display={"flex"}
                    alignItems={"center"}
                    width={"100%"}
                    padding={"6px"}
                >
                    <pre>
                        <code className={styles.code}>
                            &lt;script async src=&quot;http://localhost:3000/scripts/promoter?id=&lt;&lt;yourId&gt;&gt;&quot; crossorigin=&quot;anonymous&quot;&gt;&lt;/script&gt;
                        </code>
                    </pre>
                </Box>

                <Typography typography={"h6"} fontWeight={100} width={"100%"}>
                    {GettingStartedSectionTextPart2}
                </Typography>

                <Box 
                    bgcolor={"#181818"} 
                    border={"solid 1px rgba(250, 250, 250, .25)"} 
                    borderRadius={"5px"}
                    display={"flex"}
                    alignItems={"center"}
                    width={"100%"}
                    padding={"6px"}
                >
                    <pre>
                        <code className={styles.code}>
                            &lt;div class=&quot;theta-ad&quot;&gt;&lt;/div&gt;
                        </code>
                    </pre>
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
                    borderRadius={"5px"}
                    display={"flex"}
                    alignItems={"center"}
                    width={"100%"}
                    padding={"6px"}
                >
                    <pre>
                        <code className={styles.code}>
                            &lt;!DOCTYPE html&gt;<br/>
                            &lt;html lang=&quot;en&quot;&gt;<br/>
                            &emsp;&lt;head&gt;<br/>
                            &emsp;&emsp;&lt;meta charset=&quot;UTF-8&quot; /&gt;<br/>
                            &emsp;&emsp;&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;<br/>
                            &emsp;&emsp;&lt;title&gt;Your Website Title&lt;/title&gt;<br/>    
                            &emsp;&lt;/head&gt;<br/>
                            &emsp;&lt;body&gt;<br/>
                            &emsp;&emsp;&lt;div class=&quot;theta-ad&quot;&gt;&lt;/div&gt; &lt;!--Add as many of these divs to your code to display advertisements--&gt;<br/>   
                            &emsp;&emsp;&lt;div class=&quot;new-section&quot;&gt;<br/>     
                            &emsp;&emsp;&emsp;&lt;div&gt;<br/>
                            &emsp;&emsp;&emsp;&emsp;&lt;h1&gt;Hello NodeMarket!&lt;/h1&gt;<br/>
                            &emsp;&emsp;&emsp;&lt;/div&gt;<br/>
                            &emsp;&emsp;&lt;/div&gt;<br/>
                            &emsp;&emsp;&lt;!--Add this script tag to retrieve advertisements and get credit for promoting them. --&gt;<br/>
                            &emsp;&emsp;&lt;script async src=&quot;http://localhost:3000/scripts/promoter?id=&lt;&lt;yourId&gt;&gt;&quot; crossorigin=&quot;anonymous&quot;&gt;&lt;/script&gt;<br/>
                            &emsp;&emsp;&lt;/body&gt;<br/>
                            &lt;/html&gt;
                        </code>
                    </pre>
                </Box>

            </Card>
        </Container>
    )
}