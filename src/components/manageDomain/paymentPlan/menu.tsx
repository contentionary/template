import Menus from "@src/components/shared/menu";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import { useMenu } from "@src/utils/hooks";
import Update from "./updatePaymentPlan";
import Delete from "@src/components/shared/delete";
import MakeDefaultPaymentPlan from "./makeDefault";
interface Props {
  productId: string;
  id: string;
  amount: string;
  name: string;
  centreId: string;
  refetch: any;
  toggleToast: Function;
}
export default function PaymentPlanMenu(props: Props) {
  const { anchorEl, menuIsOpen, closeMenu, openMenu } = useMenu();
  return (
    <>
      <IconButton onClick={openMenu}>
        <Settings fontSize="large" color="primary" />
      </IconButton>

      <Menus anchorEl={anchorEl} open={menuIsOpen} closeMenu={closeMenu}>
        <div>
          <MakeDefaultPaymentPlan {...props} />
          <Update {...props} />
          <Delete
            toggleToast={props.toggleToast}
            url={`/centre/${props.centreId}/product/${props.productId}/pricing/${props.id}`}
            updateData={props.refetch}
            text={true}
          />
        </div>
      </Menus>
    </>
  );
}
