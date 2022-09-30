import { handleError, request } from "@src/utils";
import ManageDomain from "@src/components/manageDomain";
import { UserInt } from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";

export interface CentreProps {
  address: string;
  allowJoinRequest: boolean;
  audioCount: number;
  backgroundImage: string;
  bookCount: number;
  courseContentCount: number;
  createdAt: string;
  customDomain: string;
  customPublicationDomain: string;
  description: string;
  emailAddress: string;
  examCount: number;
  hasCourse: boolean;
  hasExam: boolean;
  hasLeague: boolean;
  hasPublication: boolean;
  hasResult: boolean;
  id: string;
  isPrivate: boolean;
  leagueCount: number;
  logo: string;
  name: string;
  nextPaymentDate: string;
  onlineCourseSubdomain: string;
  phoneNumber: number;
  plan: string;
  price: number;
  publicationCount: number;
  publicationSubdomain: string;
  questionCount: number;
  referralPercentage: number;
  slug: string;
  subscriberCount: number;
  updatedAt: string;
  videoCount: number;
  websiteUrl: string;
  plugins: Record<string, boolean>;
}

interface Props {
  centre: CentreProps;
  user: UserInt;
  error: string;
}

const ManageDomainPage = ({ centre, user, error }: Props): JSX.Element => {
  return <ManageDomain user={user} centre={centre} />;
};

export async function getServerSideProps(context: any) {
  try {
    const { user, token } = getAuthData(context);
    const { id } = context.query;
    if (!user || (user && !user.isCentreManager.includes(id))) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
    const { data }: any = await request.get({
      url: `/centre/${id}`,
      token,
    });
    return { props: { centre: data.data, user } };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
}
export default ManageDomainPage;
