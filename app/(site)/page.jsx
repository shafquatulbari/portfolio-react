// Route entry is a Server Component. Client logic lives in ClientHome.

export const dynamic = "force-dynamic";
export const revalidate = 0;

import ClientHome from "./ClientHome";

export default function Page() {
  return <ClientHome />;
}
