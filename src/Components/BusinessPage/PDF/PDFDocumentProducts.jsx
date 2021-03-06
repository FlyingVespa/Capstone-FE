import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import shoplogo from "../../../assets/images/shop.png";
export const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Oswald",
  },
  date: {
    fontSize: 10,
    color: "grey",
  },
  mainheader: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  shoplogo: {
    width: "10%",
    marginRight: 20,
  },
  companyheader: {
    width: "40%",
  },
  mainheadertitle: {
    fontSize: 14,
    fontFamily: "Oswald",
  },
  subheadertitle: {
    fontSize: 14,
  },

  contactcontainer: {
    display: "flex",
    width: "50%",
    flexDirection: "row",
    float: "right",
  },
  contactdetails: {
    width: "50%",
    fontSize: 10,
    color: "grey",
    textAlign: "right",
  },
  contactdetailsinfo: {
    fontSize: 10,
    width: "100%",
    textAlign: "right",
    right: 0,
  },

  image: {
    height: 50,
    width: 50,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    textTransform: "capitalize",
  },
  tableheader: {
    borderTop: "none",
    fontSize: 14,
    paddingTop: 3,
    paddingBottom: 3,
    borderBottom: "1pt green solid",
  },
  bold: {
    fontWeight: "bold",
  },

  items: {
    textTransform: "capitalize",
    fontSize: 12,
    paddingTop: 0,
    paddingBottom: 0,
  },

  row1: {
    width: "20%",
  },
  row2: {
    width: "8%",
    textAlign: "center",
  },
  row2a: {
    width: "8%",
    textAlign: "center",
    fontSize: 10,
  },
  row3: {
    width: "10%",
    textAlign: "center",
  },

  row4: {
    width: "15%",
    textAlign: "center",
  },

  row4a: {
    width: "15%",
    textAlign: "center",
    fontSize: 10,
  },
  row5: {
    width: "45%",
    textAlign: "center",
  },
  row5a: {
    width: "45%",
    fontSize: 8,
    fontFamily: "QuickSand",
  },
  border: {
    borderTop: "2pt #3e3e3e solid",
    marginTop: "10pt",
    marginBottom: "10pt",
  },

  table: {
    borderTop: "1pt  solid",
    borderRight: "1pt  solid",
    borderLeft: "1pt  solid",
    borderBottom: "1pt  solid",
    paddingHorizontal: 15,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  businessstamp: {
    position: "absolute",
    fontSize: 10,
    bottom: 35,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const fontSrc =
  "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf";
Font.register({ family: "Oswald", src: fontSrc });
const quicksandFont =
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap";
Font.register({ family: "QuickSand", src: quicksandFont });

const PDFDocumentProducts = ({ data, date, products }) => {
  if (data !== undefined && data != null) {
    return (
      <Document>
        <Page size="A4" style={styles.body}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.mainheader} wrap={false}>
            <Image src={shoplogo} style={styles.shoplogo}></Image>
            <View style={styles.companyheader}>
              <Text style={styles.title}>{data.businessname}</Text>
              <Text style={styles.subheadertitle}>{data.category}</Text>
            </View>
            <View style={styles.contactcontainer}>
              <View style={styles.contactdetails}>
                <Text style={styles.contact}>Phone:</Text>
                <Text style={styles.contact}>Address:</Text>
                <Text style={styles.contact}>Email:</Text>
              </View>
              <View style={styles.contactdetailsinfo}>
                <Text style={styles.contactdetails}>
                  {data.companydetails?.mobile}
                </Text>
                {data.address.streetname ? (
                  <Text style={styles.contactdetails}>
                    {data.companydetails?.address?.street_number}
                    {data.companydetails?.address?.street_name}
                    {data.companydetails?.address?.city}
                    {data.companydetails?.address?.country}
                  </Text>
                ) : (
                  <Text style={styles.contactdetails}>Unknown</Text>
                )}

                <Text style={styles.contactdetails}>
                  {data.companydetails?.public_email}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.border}></Text>
          <View style={styles.table}>
            <View style={[styles.row, styles.bold, styles.tableheader]}>
              <Text style={styles.row1}>Product</Text>
              <Text style={styles.row2}>Units</Text>
              <Text style={styles.row3}>Price</Text>
              <Text style={styles.row4}>Availability</Text>
              <Text style={styles.row5}>Description</Text>
            </View>

            {data &&
              products.map((item, i) => {
                return (
                  <View key={i} style={[styles.row, styles.items]} wrap={false}>
                    <Text style={styles.row1}>{item.name}</Text>
                    <Text style={styles.row2a}>{item.units}</Text>
                    <Text style={styles.row3}>$ {item.price}</Text>
                    <Text style={styles.row4a}>{item.status}</Text>
                    <Text style={styles.row5a}>{item.description}</Text>
                  </View>
                );
              })}
          </View>
          <Text style={styles.border}></Text>
          <Text style={styles.businessstamp}>
            buylocal.online/business/${data._id}{" "}
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    );
  } else
    return (
      <Document>
        <Page size="A4">
          <View>
            <Text>This Pdf could not be generated</Text>
          </View>
        </Page>
      </Document>
    );
};

export default PDFDocumentProducts;
