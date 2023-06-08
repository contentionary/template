import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "react-query";

import { handleError, queryClient, request } from "@src/utils";
import MuiTable from "@src/components/shared/table";
import AddPaymentPlan from "./addPaymentPlan";
import Empty from "@src/components/shared/state/Empty";
import PaymentPlanMenu from "./menu";
import { BasePageProps } from "@src/utils/interface";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";

interface PaymentPlanInt {
  amount: string;
  name: string;
  id: string;
  productId: string;
  currency: string;
  durationInDays: number;
}

const fetchSections = async ({ queryKey }: { queryKey: Array<any> }) => {
  const [, id, setPaymentPlan] = queryKey;
  const { data } = await request.get({
    url: `/product/${id}/pricing`,
  });
  setPaymentPlan && setPaymentPlan(data);
  return data;
};

export default function PaymentPlan() {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const id = cachedData.centre.id;
  const { isLoading, data, error, refetch } = useQuery(
    ["sections", id],
    fetchSections
  );
  const { toastMessage, toggleToast } = useToast();
  const [paymentPlan, setPaymentPlan] = React.useState(data);
  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 100, name: "Name", key: "name" },
    { minWidth: 100, name: "Amount", key: "amount" },
    { minWidth: 100, name: "Currency", key: "currency" },
    { minWidth: 100, name: "Duration (In days)", key: "durationInDays" },
    { minWidth: 50, name: "Action", key: "action" },
  ];
  React.useEffect(() => {
    if (data) {
      setPaymentPlan(data);
    }
  }, [data]);

  const result = paymentPlan?.map((item: PaymentPlanInt, index: number) => ({
    index: ++index,
    ...item,
    action: (
      <PaymentPlanMenu
        {...item}
        toggleToast={toggleToast}
        centreId={cachedData.centre.id}
        refetch={refetch}
      />
    ),
  }));
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (data) {
    const pageCount = data?.pageCount as number;
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      fetchSections({
        queryKey: ["sections", cachedData.centre.id, id, value, setPaymentPlan],
      });
    };
    return (
      <div>
        <Stack spacing={4} marginTop={4}>
          <Typography
            variant="h5"
            component="p"
            sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
          >
            Centre Payment Plan
          </Typography>
          <Typography variant="body1" component="p">
            add payment plan to centre.
          </Typography>
          <Typography>
            <AddPaymentPlan
              toggleToast={toggleToast}
              refetch={refetch}
              productId={id as string}
            />
          </Typography>

          {result?.length ? (
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
            status={Boolean(toastMessage)}
            message={toastMessage}
            showToast={toggleToast}
          />
        )}
      </div>
    );
  } else return <div>{handleError(error).message}</div>;
}
