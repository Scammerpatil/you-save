import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import { NextRequest, NextResponse } from "next/server";
import SavedLinks from "@/models/SavedLinks";

dbConfig();

//Adding cors

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Token not found login again" },
      { status: 400 }
    );
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      _id: string;
    };
    if (!data) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    const { title, url, platform, folder } = await req.json();
    const category = getCategory(url);

    console.log(title, url, platform);
    if (!title || !url) {
      return NextResponse.json(
        { message: "Please provide title and link" },
        { status: 400 }
      );
    }
    const link = new SavedLinks({
      user: data._id,
      url: url,
      title: title,
      platform: platform,
      category: category,
      folder: folder,
    });
    await link.save();
    return NextResponse.json({ message: "Link saved" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

function getCategory(url: string) {
  const lowerUrl = url.toLowerCase();

  // **Video Content**
  if (lowerUrl.includes("youtube.com/shorts")) return "YouTube Shorts";
  if (lowerUrl.includes("youtube.com/playlist")) return "YouTube Playlist";
  if (lowerUrl.includes("youtube.com/live")) return "YouTube Live";
  if (lowerUrl.includes("youtube.com")) return "YouTube Video";
  if (lowerUrl.includes("vimeo.com")) return "Vimeo Video";
  if (lowerUrl.includes("dailymotion.com")) return "Dailymotion Video";
  if (lowerUrl.includes("tiktok.com")) return "TikTok Video";

  // **Instagram**
  if (lowerUrl.includes("instagram.com/reels")) return "Instagram Reels";
  if (lowerUrl.includes("instagram.com/p/")) return "Instagram Post";
  if (lowerUrl.includes("instagram.com/tv")) return "Instagram TV";
  if (lowerUrl.includes("instagram.com/stories")) return "Instagram Stories";
  if (lowerUrl.includes("instagram.com")) return "Instagram Content";

  // **Social Media**
  if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com"))
    return "Twitter/X Post";
  if (lowerUrl.includes("facebook.com")) return "Facebook Post";
  if (lowerUrl.includes("linkedin.com/posts")) return "LinkedIn Post";
  if (lowerUrl.includes("linkedin.com/articles")) return "LinkedIn Article";
  if (lowerUrl.includes("quora.com")) return "Quora Answer";
  if (lowerUrl.includes("reddit.com")) return "Reddit Post";
  if (lowerUrl.includes("reddit.com/r/")) return "Reddit Community";

  // **Coding & Tech Blogs**
  if (lowerUrl.includes("github.com")) return "GitHub Repository";
  if (lowerUrl.includes("gitlab.com")) return "GitLab Repository";
  if (lowerUrl.includes("bitbucket.org")) return "Bitbucket Repository";
  if (lowerUrl.includes("stackoverflow.com")) return "StackOverflow Question";
  if (lowerUrl.includes("dev.to")) return "Developer Blog";
  if (lowerUrl.includes("medium.com")) return "Medium Article";
  if (lowerUrl.includes("hashnode.dev")) return "Hashnode Blog";
  if (lowerUrl.includes("freecodecamp.org")) return "FreeCodeCamp Article";

  // **Blogs & Articles**
  if (lowerUrl.includes("blog")) return "Blog Post";
  if (lowerUrl.includes("substack.com")) return "Substack Newsletter";
  if (lowerUrl.includes("news.ycombinator.com")) return "Hacker News Post";
  if (lowerUrl.includes("forbes.com")) return "Forbes Article";
  if (lowerUrl.includes("nytimes.com")) return "NY Times Article";
  if (lowerUrl.includes("wsj.com")) return "WSJ Article";

  // **Educational Content**
  if (lowerUrl.includes("udemy.com")) return "Udemy Course";
  if (lowerUrl.includes("coursera.org")) return "Coursera Course";
  if (lowerUrl.includes("edx.org")) return "EdX Course";
  if (lowerUrl.includes("khanacademy.org")) return "Khan Academy Lesson";

  // **Design & Inspiration**
  if (lowerUrl.includes("dribbble.com")) return "Dribbble Design";
  if (lowerUrl.includes("behance.net")) return "Behance Portfolio";
  if (lowerUrl.includes("pinterest.com/pin")) return "Pinterest Pin";
  if (lowerUrl.includes("pinterest.com")) return "Pinterest Collection";

  // **E-commerce & Shopping**
  if (lowerUrl.includes("amazon.com")) return "Amazon Product";
  if (lowerUrl.includes("flipkart.com")) return "Flipkart Product";
  if (lowerUrl.includes("ebay.com")) return "eBay Listing";
  if (lowerUrl.includes("etsy.com")) return "Etsy Product";
  if (lowerUrl.includes("shopify.com")) return "Shopify Store";

  // **Finance & Investments**
  if (lowerUrl.includes("bloomberg.com")) return "Bloomberg Finance";
  if (lowerUrl.includes("coinmarketcap.com")) return "Crypto Prices";
  if (lowerUrl.includes("tradingview.com")) return "Stock Chart";
  if (lowerUrl.includes("robinhood.com")) return "Stock Investment";
  if (lowerUrl.includes("crypto.com")) return "Crypto Trading";

  return "Other";
}
