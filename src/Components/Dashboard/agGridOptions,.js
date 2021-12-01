import { Avatar, Button, IconButton } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";

export const defaultColumnDef = {
  suppressColumnVirtualisation: true,
  skipHeaderOnAutoSize: true,
  sortable: true,
  filter: true,
  resizable: true,
  pagnation: true,
  paginationPageSize: 5,
  minWidth: 100,
  width: 100,
  enableVerticalScrollbar: 0,
};

export const convertDate = (data) => {
  return data.value ? new Date(data.value).toLocaleDateString() : "";
};
