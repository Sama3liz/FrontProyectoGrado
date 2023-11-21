import DataTable from "react-data-table-component";
import { View } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";

const DataTableComponent = () => {
  const { goTo } = useNavigationHelpers();

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Edit",
      selector: (row) => (
        <CustomButton text="Edit" onPress={() => onEditPress(row.id)} />
      ),
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const onEditPress = (id) => {
    console.log("El id es: " + id);
    goTo("ProductProfile", { id });
  };

  const ExpandedComponent = ({ data }) => {
    return <View>{JSON.stringify(data)}</View>;
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      sortActive={true}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
    />
  );
};

export default DataTableComponent;
