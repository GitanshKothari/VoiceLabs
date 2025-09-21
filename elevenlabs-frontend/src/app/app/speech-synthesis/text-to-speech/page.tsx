import { PageLayout } from "~/components/layout/page-layout";
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

  return (
    <PageLayout currentPage="text-to-speech" user={user}>
      <div className="p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-foreground mb-6 text-3xl font-bold">Dashboard</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card border-border rounded-lg border p-6">
              <h3 className="text-foreground mb-2 text-lg font-semibold">
                Total Voices
              </h3>
              <p className="text-primary text-3xl font-bold">24</p>
            </div>
            <div className="bg-card border-border rounded-lg border p-6">
              <h3 className="text-foreground mb-2 text-lg font-semibold">
                Projects
              </h3>
              <p className="text-primary text-3xl font-bold">12</p>
            </div>
            <div className="bg-card border-border rounded-lg border p-6">
              <h3 className="text-foreground mb-2 text-lg font-semibold">
                Usage
              </h3>
              <p className="text-primary text-3xl font-bold">89%</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
