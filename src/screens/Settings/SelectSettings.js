import {StyleSheet, Text, View} from "react-native";
import {colors, fonts} from "../../constants/styles";
import {moderateScale, verticalScale} from "../../utils/metrics";
import {useLayoutEffect} from "react";
import RadioButtonGroup from "../../UI/RadioButtonGroup";
import {useDispatch} from "react-redux";
import {updateAppSetting} from "../../store/reducers/settings";

const SelectSettings = ({navigation, route}) => {
    const {title, description, labels, defaultValue, fieldName} = route.params;
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
        });
    }, [navigation]);

    function onValueChanged(value) {
        dispatch(updateAppSetting({value, name: fieldName}))
    }

    return (
        <View style={styles.root}>
            <Text style={styles.description}>{description}</Text>
            <RadioButtonGroup
                labels={labels}
                defaultValue={defaultValue}
                onValueChange={onValueChanged}
            />
        </View>
    );
};

export default SelectSettings;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.primary200,
        padding: moderateScale(15),
    },
    description: {
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(18),
        color: colors.textPrimary200,
        marginBottom: verticalScale(30),
    },

});