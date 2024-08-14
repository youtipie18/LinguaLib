import {moderateScale} from "../../../utils/metrics";
import {colors, commonIcons} from "../../../constants/styles";
import DrawerIcon from "../../../components/navigation/DrawerIcon";
import MenuWrapper from "../../../components/Menu/MenuWrapper";

const DetailsMenu = ({bookId}) => {
    const options = [
        {icon: commonIcons.check, label: 'Mark as read', action: () => console.log(`markAsRead${bookId}`)},
        {icon: commonIcons.edit, label: 'Edit', action: () => console.log(`edit${bookId}`)},
        {icon: commonIcons.share, label: 'Share', action: () => console.log(`share${bookId}`)},
        {icon: commonIcons.restore, label: 'Restore', action: () => console.log(`restore${bookId}`)},
        {icon: commonIcons.trash, label: 'Delete', action: () => console.log(`delete${bookId}`)},
    ];

    return (
        <MenuWrapper
            trigger={
                <DrawerIcon
                    icon={commonIcons.dotsVertical}
                    size={moderateScale(24)}
                    color={colors.textPrimary100}
                />
            }
            options={options}
            optionsContainerStyle={{backgroundColor: colors.primary100}}
        />
    );
};

export default DetailsMenu;