import { PageLayout } from "~/components/layout/page-layout";
import { getHistoryItems } from "~/lib/history";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function TextToSpeechPage() {
  const session = await auth();
  const userId = session?.user.id;

  let credits = 0;
  let user = null;

  if (userId) {
    user = await db.user.findUnique({
      where: { id: userId },
      select: {
        credits: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
      },
    });
    credits = user?.credits ?? 0;
  }
  const service = "styletts2";
  const TextToSpeechTabs = [
    {
      name: "Generate",
      path: "/app/speech-synthesis/text-to-speech",
    },
    {
      name: "History",
      path: "/app/sound-effects/history",
    },
  ];


  const historyItems = await getHistoryItems(service);

  return (
    <PageLayout currentPage="text-to-speech" user={user} tabs={TextToSpeechTabs} pageTitle="Text to Speech" showSidebar={true} service={service} historyItems={historyItems}>
      <></>
    </PageLayout>
  );
}
