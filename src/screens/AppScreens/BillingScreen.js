import React from "react";
import { View, ScrollView } from "react-native";
import styles from "../../styles/styles";

import BillingStepper from "../../components/Steper/BillingStepper";

const BillingScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={styles.root}
    >
      <View
        style={[
          styles.container,
          { flex: 1, justifyContent: "center", alignContent: "flex-end" },
        ]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <BillingStepper />
        </View>
      </View>
    </ScrollView>
  );
};

export default BillingScreen;
