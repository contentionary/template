import { GetServerSidePropsContext } from "next";
import { cache } from ".";
import { UserInt } from "./interface";

export const setAuth = ({
  id,
  firstname,
  surname,
  avatar,
  status,
  token,
  subscribedPublications,
  isAdmin,
}: UserInt) => {
  cache.set(
    "user",
    {
      id,
      firstname,
      avatar,
      status,
      surname,
      subscribedPublications,
      isAdmin,
    },
    true
  );

  cache.set("token", token, true);
};

export const logout = () => {
  cache.delete("user", true);
  cache.delete("token", true);
};

export const getAuthData = (context?: GetServerSidePropsContext) => {
  return {
    user: cache.get("user", context),
    token: cache.get("token", context),
  };
};

export const Auth = {
  isCentreOwner: (centreId: string, user: UserInt) => {
    user = user || cache.get("user");
    const ownCentres = user.ownCentres;
    return ownCentres && ownCentres.includes(centreId);
  },
  isManager: (centreId: string, user: UserInt) => {
    user = user || cache.get("user");
    const managingCentres = user.managingCentres;
    return managingCentres && managingCentres.includes(centreId);
  },
  isCentreSubscriber: (centreId: string, user: UserInt) => {
    user = user || cache.get("user");
    const centreSubscriber = user.subscribedCentres;

    return centreSubscriber && centreSubscriber.includes(centreId);
  },
  isPendingSubscriber: (centreId: string, user: UserInt) => {
    user = user || cache.get("user");
    const pendingCentres = user.pendingCentres;
    return pendingCentres && pendingCentres.includes(centreId);
  },
  isPublicationSubscriber: ({
    publicationId,
    user,
  }: {
    publicationId: string;
    centreId: string;
    user: UserInt;
  }) => {
    const { subscribedPublications = [] } = user || cache.get("user") || {};
    return subscribedPublications.includes(publicationId);
  },
  isCourseSubscriber: (courseId: string, user: UserInt) => {
    const { subscribedCourses = [] } = user || cache.get("user") || {};
    return subscribedCourses.includes(courseId);
  },
  isExamSubscriber: (examId: string, user: UserInt) => {
    const { subscribedExams = [] } = user || cache.get("user") || {};
    return subscribedExams.includes(examId);
  },
  isLeagueSubscriber: (leagueId: string, user: UserInt) => {
    const { subscribedLeagues = [] } = user || cache.get("user") || {};
    return subscribedLeagues.includes(leagueId);
  },
  setData: ({
    id,
    firstname,
    surname,
    avatar,
    status,
    token,
    subscribedPublications,
  }: UserInt) => {
    cache.set(
      "user",
      {
        id,
        firstname,
        avatar,
        status,
        surname,
        subscribedPublications,
      },
      true
    );

    cache.set("token", token, true);
  },
  getData: (context?: GetServerSidePropsContext) => ({
    user: cache.get("user", context),
    token: cache.get("token", context),
  }),
};
