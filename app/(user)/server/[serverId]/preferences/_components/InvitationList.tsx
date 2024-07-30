import FeedbackCard from "@/app/_components/FeedbackCard";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { getInvitationsByServer } from "@/prisma/services/invitationService";
import InvitationObject from "./InvitationObject";
import errorHandler from "@/utils/errorHandler";

export default async function ServerInvitationsList({
  serverId,
  authMatch,
}: {
  serverId: string;
  authMatch: boolean;
}) {
  const element: JSX.Element = await errorHandler(
    async () => {
      const invitations = await getInvitationsByServer(serverId);

      if (invitations.length === 0)
        return <p>There are no active invitations.</p>;
      return (
        <ColumnWrapper
          mode="section"
          id="invitations"
          align="content-start items-start"
        >
          {invitations.map((item) => (
            <InvitationObject
              key={item.id}
              invitation={item}
              deletable={authMatch}
            />
          ))}
        </ColumnWrapper>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong!" />;
    },
  );

  return element;
}
