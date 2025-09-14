import { useExpertSlots } from '@/api/expert/expert';
import { useAppTheme } from '@/constants/themes/ThemeManager';
import { useAuth } from '@/providers/AuthProvider';
import {View, Text} from 'react-native';

export default function ExpertSlot() {
    const {session} = useAuth();
    const {data: expertSlots, isLoading:isExpertSlotLoading} = useExpertSlots(session?.user.id ?? "");
    const {styles} = useAppTheme();
    const screenStyles = styles.ExpertSlotsScreen;

    return (
        <View style={screenStyles.container}>
            <View>
                <Text>
                    {
                        expertSlots?.length === 0 ? "no data found": JSON.stringify(expertSlots)                    
                    }
                </Text>
                
            </View>
        </View>
    )
}