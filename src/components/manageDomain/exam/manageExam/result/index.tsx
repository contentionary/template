import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import format from "date-fns/format";

import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import { handleError, isServerSide, queryClient, request } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { ButtonGroup } from "@mui/material";
import { useRouter } from "next/router";
import { useToast } from "@src/utils/hooks";

import ButtonComponent from "@src/components/shared/button";
import MuiTable from "@src/components/shared/table";
import Menu from "./menu";
import TableMenu from "./tableMenu";

interface ResultInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
}

const fetchResult = async ({ queryKey }: { queryKey: Array<any> }) => {
  const [, centreId, examId] = queryKey;
  const { data } = await request.get({
    url: `/centre/${centreId}/exam/${examId}/answers`,
  });
  return data.result;
};

export default function Result({
  centreId,
  examId,
}: {
  centreId: string;
  examId: string;
}) {
  // const [transactionType, setTransactionType] = React.useState("all");
  // const { pageData, cachedData } = queryClient.getQueryData(
  //   "pageProps"
  // ) as BasePageProps;
  // const [transactions, setTransaction] = React.useState<any>(
  //   pageData.transactionHistory
  // );

  // const { isLoading, error, data } = useQuery(
  //   "sections",
  //   async () =>
  //     await request.get({
  //       url: `/centre/${centreId}/exam/${examId}/answers`,
  //     })
  // );

  const { isLoading, data, error } = useQuery(
    ["results", centreId, examId],
    fetchResult
  );

  // const { walletBalance } = pageData;
  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 100, name: "Surname", key: "surname" },
    { minWidth: 100, name: "First name", key: "firstname" },
    { minWidth: 50, name: "Exam Score", key: "score" },
    { minWidth: 50, name: "Duration (In minutes)", key: "duration" },
    { minWidth: 70, name: "Gender", key: "gender" },
    { minWidth: 70, name: "Max Score", key: "maxScore" },
    { minWidth: 250, name: "Action", key: "action" },
  ];
  // const getSections=(sectionScore)=>{
  //  const section = sectionScore.map(({name, score})=>)
  // }
  // const [result, setResult] = React.useState(data?.data?.result);
  const results = data?.map((result: ResultInt, index: number) => ({
    index: ++index,
    ...result,
    action: <TableMenu result={result} centreId={centreId} examId={examId} />,
  }));
  // async function getTransactions(type: string) {
  //   try {
  //     setTransactionType(type);
  //     if (type === "all") {
  //       setTransaction([...pageData.transactionHistory]);
  //     } else {
  //       const { data } = await request.get({
  //         url: `/wallet/centre/${cachedData.centre.id}/transaction-history?type=${type}`,
  //       });
  //     }
  //   } catch (error) {
  //     toggleToast(handleError(error).message);
  //   }
  // }
  if (isLoading) {
    return <div>Loading....</div>;
  } else if (data) {
    return (
      <div>
        <Stack spacing={4} marginTop={4}>
          <Typography
            variant="h5"
            component="p"
            sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
          >
            Exam Result
          </Typography>
          <Typography>
            <Menu />
          </Typography>

          <Box sx={{ width: { xs: 400, md: "100%" } }}>
            <MuiTable data={results} columns={columns} bgColor="#F7F7F7" />
          </Box>
        </Stack>
      </div>
    );
  } else if (error) return <div>{handleError(error).message}</div>;
}
