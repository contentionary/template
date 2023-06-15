import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { queryClient } from "@src/utils";
import MuiTable from "@src/components/shared/table";
import AddSubscriber from "./addCandidate";
import Empty from "@src/components/shared/state/Empty";
import Delete from "@src/components/shared/delete";
import { useRouter } from "next/router";
import { useToast } from "@src/utils/hooks";
import dynamic from "next/dynamic";
import { BasePageProps } from "@src/utils/interface";
import TextFields from "@src/components/shared/input/textField";
import ButtonComponent from "@src/components/shared/button";

interface SubscriberInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
  userId: string;
}

export default function Candidates() {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const candidates = pageData.candidateList.candidates;
  const pageCount = pageData.candidateList.pageCount as number;
  const [limit, setLimit] = React.useState(50);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value, limit },
    });
  };
  const { id } = router.query;
  const centreId = cachedData.centre.id;
  const { toastMessage, toggleToast } = useToast();
  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 100, name: "Surname", key: "surname" },
    { minWidth: 100, name: "First name", key: "firstname" },
    { minWidth: 50, name: "Username", key: "username" },
    { minWidth: 70, name: "Email", key: "email" },
    { minWidth: 70, name: "Phone Number", key: "phoneNumber" },
    { minWidth: 250, name: "Action", key: "action" },
  ];
  console.log(candidates);
  const result = candidates?.map((item: SubscriberInt, index: number) => ({
    index: ++index,
    ...item,
    action: (
      <Delete
        updateData={(e: any) => handleChange(e, 1)}
        toggleToast={toggleToast}
        url={`/centre/${centreId}/league/${id}/candidate/${item.userId}`}
      />
    ),
  }));
  return (
    <div>
      <Stack spacing={4} marginTop={4}>
        <Typography
          variant="h5"
          component="p"
          sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
        >
          League Candidates
        </Typography>
        <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
          <AddSubscriber
            toggleToast={toggleToast}
            refetch={(e: any) => handleChange(e, 1)}
            centreId={centreId as string}
            id={id as string}
          />
          <Stack direction="row">
            <TextFields
              type="number"
              variant="standard"
              label="Limit"
              onBlur={(e: any) => setLimit(e.target.value)}
              sx={{ maxWidth: 70, padding: 0 }}
            />
            <ButtonComponent onClick={(e) => handleChange(e, 1)}>
              Apply limit
            </ButtonComponent>
          </Stack>
        </Typography>

        {result.length ? (
          <Box sx={{ width: { xs: 400, md: "100%" } }}>
            <MuiTable data={result} columns={columns} bgColor="#F7F7F7" />
            <Stack py={4} direction="row" justifyContent="center" spacing={2}>
              {pageCount > 1 && (
                <Pagination
                  count={pageCount}
                  onChange={handleChange}
                  shape="rounded"
                  size="large"
                />
              )}
            </Stack>
          </Box>
        ) : (
          <Empty />
        )}
      </Stack>
      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
    </div>
  );
}
