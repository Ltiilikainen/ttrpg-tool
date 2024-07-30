import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import {
  getServerConfig,
  getServerData,
} from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ServerInvitationsList from "./_components/InvitationList";
import getServerAuth from "@/actions/getServerAuth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import checkAuthMatch from "@/utils/checkServerAuthMatch";
import errorHandler from "@/utils/errorHandler";
import Link from "next/link";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import FormContainer from "./_components/FormContainer";

export default async function ServerPreferences({
  params,
}: {
  params: Params;
}) {
  const id = params.serverId;
  const session = await auth();

  if (!session) redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const server = await getServerData(id, {
        select: { server_name: true, description: true, image: true },
        config: {
          id: true,
          server_id: true,
          config_permission: true,
          protected: true,
          password_hash: true,
          explorable: true,
          searchable: true,
          join_permission: true,
        },
      });

      console.log(server);

      const serverAuth = await getServerAuth(
        id,
        (session as ExtendedSession).userId,
      );

      if (!serverAuth) redirect("/server");

      return (
        <Fragment>
          <FormContainer server={server} serverAuth={serverAuth} />
          <h2 className="my-2">Invitations</h2>
          <ServerInvitationsList
            serverId={id}
            authMatch={checkAuthMatch(serverAuth, server.config![0])}
          />
        </Fragment>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return (
    <Main className="relative min-h-[90vh] w-full px-4 py-10">
      <Link
        href={`/server/${id}`}
        className="card-back absolute left-0 top-0 flex h-[2.4rem] w-full content-center items-center gap-2 px-4"
      >
        <MaterialSymbolsLightChevronLeftRounded className="flex-shrink-0 text-2xl" />
        <span>Return</span>
      </Link>
      {element}
    </Main>
  );
}
