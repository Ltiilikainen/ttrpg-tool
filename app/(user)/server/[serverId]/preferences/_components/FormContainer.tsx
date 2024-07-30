"use client";

import Divider from "@/app/_components/Divider";
import checkAuthMatch from "@/utils/checkServerAuthMatch";
import { Fragment, useTransition } from "react";
import Discoverability from "./Discoverability";
import ServerSecurity from "./Security";
import ServerInfo from "./ServerInfo";

export default function FormContainer({
  server,
  serverAuth,
}: {
  server: ServerData;
  serverAuth: ServerMember;
}) {
  const config = server.config![0];

  const authMatch = checkAuthMatch(serverAuth, config);

  const [isPending, startTransition] = useTransition();

  return (
    <Fragment>
      <h2>Server information</h2>

      <ServerInfo
        info={server}
        serverAuth={serverAuth}
        config={config}
        editable={authMatch}
        isPending={isPending}
        startTransition={startTransition}
      />

      <Divider />

      {authMatch && (
        <Fragment>
          <h2 className="my-2">Security</h2>
          <ServerSecurity
            serverAuth={serverAuth}
            config={config}
            isPending={isPending}
            startTransition={startTransition}
          />{" "}
          <Divider />
        </Fragment>
      )}

      {authMatch && (
        <Fragment>
          <h2 className="my-2">Discoverability</h2>
          <Discoverability
            serverAuth={serverAuth}
            config={config}
            isPending={isPending}
            startTransition={startTransition}
          />{" "}
          <Divider />
        </Fragment>
      )}
    </Fragment>
  );
}
