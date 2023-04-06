import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import MuiTable from "@src/components/shared/table";
import Empty from "@src/components/shared/state/Empty";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useToast } from "@src/utils/hooks";

interface SubscriberInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
  userId: string;
}
interface SubscriberListInt {
  users: SubscriberInt[];
  pageCount: number;
}
export default function Subscribers({
  registeredUsers,
}: {
  registeredUsers: SubscriberListInt;
  centreId: string;
}) {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const { toastMessage, toggleToast } = useToast();
  const pageCount = registeredUsers.pageCount as number;
  const router = useRouter();
  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 100, name: "Surname", key: "surname" },
    { minWidth: 100, name: "First name", key: "firstname" },
    { minWidth: 150, name: "Email", key: "email" },
    { minWidth: 70, name: "Phone Number", key: "phoneNumber" },
    { minWidth: 50, name: "Status", key: "status" },
  ];

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };
  const result = registeredUsers.users.map((user, index: number) => ({
    index: ++index,
    ...user,
  }));

  if (!registeredUsers) return <h1>....Loading</h1>;
  return (
    <Box
      component="section"
      sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
      className="hero-section"
    >
      <Container maxWidth="xl">
        <Stack spacing={4} marginTop={4}>
          <Typography
            variant="h5"
            component="p"
            sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
          >
            Centre Registered Users
          </Typography>
          {result.length ? (
            <Box sx={{ width: { xs: 400, md: "100%" } }}>
              <MuiTable data={result} columns={columns} bgColor="#F7F7F7" />
            </Box>
          ) : (
            <Empty />
          )}
        </Stack>
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
        {toastMessage && (
          <Toast
            message={toastMessage}
            status={Boolean(toggleToast)}
            showToast={toggleToast}
          />
        )}
      </Container>
    </Box>
  );
}
