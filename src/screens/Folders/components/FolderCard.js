import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {colors, commonIcons, folderIcons, fonts} from "../../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../../utils/metrics";
import {Pressable, StyleSheet, Text, View} from "react-native";
import FolderMenu from "./FolderMenu";
import CardWithIcons from "../../../UI/CardWithIcons";
import InputField from "../../../UI/InputField";
import useModal from "../../../hooks/useModal";

const FolderCard = ({item, onEdit, onDelete}) => {
    const [title, setTitle] = useState(item.title);
    const [isEditing, setEditing] = useState(item.title.length === 0);
    const {showModal} = useModal(
        "Note",
        "Folder name cannot be empty!",
        "Delete folder",
        () => onDelete(item.id),
        "Continue",
    );

    function toggleEdit() {
        setEditing(prev => !prev);
    }

    function handleEdit(value) {
        setTitle(value);
    }

    function handleSubmit() {
        if (title.length) {
            onEdit(item.id, title);
            toggleEdit();
            return;
        }

        showModal();
    }

    return (
        <CardWithIcons
            leftIcon={
                <FontAwesomeIcon
                    icon={item.isDefault ? folderIcons.rootFolder : folderIcons.folder}
                    size={moderateScale(36)}
                    color={colors.textPrimary200}
                />
            }
            content={
                <View style={styles.textWrapper}>
                    {
                        isEditing ?
                            <InputField
                                inputStyles={{...styles.cardTitle, ...styles.inputText}}
                                wrapperStyles={styles.inputWrapper}
                                defaultValue={title}
                                onChangeText={handleEdit}
                                autoFocus={true}
                                placeholder={"New Folder"}
                            />
                            :
                            <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode={"middle"}>{title}</Text>
                    }
                    <Text style={styles.cardSubtitle} numberOfLines={1} ellipsizeMode={"middle"}>{item.path}</Text>
                </View>
            }
            rightIcon={
                isEditing ?
                    <Pressable onPress={handleSubmit}>
                        <FontAwesomeIcon
                            icon={commonIcons.check}
                            size={moderateScale(24)}
                            color={colors.textPrimary200}
                        />
                    </Pressable>
                    :
                    <FolderMenu folderId={item.id} onEdit={toggleEdit} onDelete={onDelete}/>
            }
        />
    );
};

export default FolderCard;

const styles = StyleSheet.create({
    textWrapper: {
        marginLeft: horizontalScale(5),
        marginVertical: verticalScale(5),
        width: "75%",
    },
    cardTitle: {
        fontSize: moderateScale(24),
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
        lineHeight: moderateScale(24),
    },
    cardSubtitle: {
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(16),
        color: colors.textAccent100,
        lineHeight: moderateScale(16)
    },
    inputText: {
        textAlignVertical: "bottom",
    },
    inputWrapper: {
        width: "90%",
    }
});