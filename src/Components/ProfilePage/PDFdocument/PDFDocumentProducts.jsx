import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Oswald",
  },

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  image: {
    height: 50,
    width: 50,
  },

  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    textTransform: "capitalize",
  },
  header: {
    borderTop: "none",
    fontSize: 14,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: "f8f9fa",
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
    width: "15%",
  },
  row3: {
    width: "15%",
  },
  row4: {
    width: "15%",
  },
  row5: {
    width: "35%",
  },
  border: {
    borderTop: "2pt #3e3e3e solid",
    marginTop: "10pt",
    marginBottom: "10pt",
  },

  container: {
    borderTop: "1pt green solid",
    borderRight: "1pt red solid",
    borderLeft: "1pt green solid",
    borderBottom: "1pt green solid",
    paddingHorizontal: 15,
  },

  contact: {
    fontSize: 12,
    textAlign: "right",
  },

  container1: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  container2: {
    width: "85%",
  },
  container3: {
    width: "15%",
  },
  contactdetails: {
    fontSize: 12,
    color: "grey",
    textAlign: "right",
  },
});

const fontSrc =
  "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf";
Font.register({ family: "Oswald", src: fontSrc });

const PDFDocumentProducts = ({ data, profile }) => {
  if (data !== undefined && data != null) {
    return (
      <Document>
        <Page size="A4" style={styles.body}>
          <View style={styles.container1}>
            <View style={styles.container2}>
              <Text style={styles.title}>{profile.businessname}</Text>
              <Text style={styles.author}>{profile.category}</Text>
            </View>
            <View>
              <Text style={styles.contact}>Phone:</Text>
              <Text style={styles.contact}>Address:</Text>
              <Text style={styles.contact}>Email:</Text>
            </View>
            <View style={styles.container3}>
              <Text style={styles.contactdetails}>Phone:</Text>
              <Text style={styles.contactdetails}>Address:</Text>
              <Text style={styles.contactdetails}>Email:</Text>
            </View>
          </View>
          <Text style={styles.border}></Text>
          <View style={styles.container}>
            <View style={[styles.row, styles.bold, styles.header]}>
              <Text style={styles.row1}>Product</Text>
              <Text style={styles.row2}>Units</Text>
              <Text style={styles.row3}>Price</Text>
              <Text style={styles.row4}>Availability</Text>
              <Text style={styles.row5}>Description</Text>
            </View>

            {data &&
              data.map((item, i) => {
                return (
                  <View style={[styles.row, styles.items]} wrap={false}>
                    <Text style={styles.row1}>{item.product}</Text>
                    <Text style={styles.row2}>{item.unit}</Text>
                    <Text style={styles.row3}>{item.price}</Text>
                    <Text style={styles.row4}>{item.status}</Text>
                  </View>
                );
              })}
          </View>
          <Text>{data.product}</Text>
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
