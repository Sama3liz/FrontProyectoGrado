import { useNavigation } from "@react-navigation/core";

const useNavigate = () => {
  const navigation = useNavigation();

  const goTo = (screenName, params={}) => {
    navigation.navigate(screenName, params);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return { goTo, goBack };
};

export default useNavigate;
