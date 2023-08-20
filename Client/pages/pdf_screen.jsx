import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const PDFDownloadPage = () => {
  const pdfList = [
    { title: "Sample PDF 1", url: "https://example.com/sample1.pdf" },
    { title: "Sample PDF 2", url: "https://example.com/sample2.pdf" },
    // Add more PDFs as needed
  ];

  const handleDownload = (url) => {
    // Implement your PDF download logic here
    console.log("Downloading PDF from:", url);
  };

  return (
    <View style={styles.container}>
      {pdfList.map((pdf, index) => (
        <TouchableOpacity
          key={index}
          style={styles.pdfContainer}
          onPress={() => handleDownload(pdf.url)}
        >
          <Text style={styles.pdfTitle}>{pdf.title}</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F4F4F4",
  },
  pdfContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3,
    padding: 10,
  },
  pdfTitle: {
    flex: 1,
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
});

export default PDFDownloadPage;
