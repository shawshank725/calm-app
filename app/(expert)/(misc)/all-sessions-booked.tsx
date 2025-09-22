import { useGetExpertSessions, useStudentProfilesByExpert } from '@/api/expert-peer/expert-peer';
import { Sessions } from '@/api/expert-peer/sessions';
import { acceptDenySessionAction, formatDate, formatTime, toTitleCase } from '@/api/others';
import { useAppTheme } from '@/constants/themes/ThemeManager';
import { useAuth } from '@/providers/AuthProvider';
import { useState } from 'react';
import { View, Text } from 'react-native';

const AllSessionsBooked = () => {
    const { session } = useAuth();
    const { data: expertSessions, refetch: refetchExpertSessions } = useGetExpertSessions(session?.user.id ?? "");
    const { data: studentProfiles } = useStudentProfilesByExpert(session?.user.id ?? "");
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { styles } = useAppTheme();
    const screenStyles = styles.AllSessionsExpertScreen;

    return (
        <View style={screenStyles.container}>
            {expertSessions?.map((expertSession: Sessions, index: number) => {
                const student = studentProfiles?.find(
                    (profile) => profile.id === expertSession.student_id
                );

                return (
                    <View key={index} style={screenStyles.sessionCard}>
                        <View style={screenStyles.sessionCardDataContainer}>
                            <Text>
                                <Text style={screenStyles.sessionCardDataName}>Date: </Text>
                                {formatDate(expertSession.start_time)}
                            </Text>
                            <Text>
                                <Text style={screenStyles.sessionCardDataName}>Time: </Text>
                                {formatTime(expertSession.start_time)} – {formatTime(expertSession.end_time)}
                            </Text>
                            <Text>
                                <Text style={screenStyles.sessionCardDataName}>Status: </Text>
                                {toTitleCase(expertSession.status)}
                            </Text>
                            <Text>
                                <Text style={screenStyles.sessionCardDataName}>Student name: </Text>
                                {student ? student.full_name ?? student.name ?? 'Unknown' : 'Loading…'}
                            </Text>
                        </View>

                        <View style={screenStyles.buttonContainer}>
                            <View
                                style={{
                                    backgroundColor:
                                        expertSession.status === 'ACCEPTED' || expertSession.status === 'DENIED'
                                            ? '#d3ffd396' // faded/disabled look
                                            : '#99fd9996',
                                    display: 'flex',
                                    height: '100%',
                                    justifyContent: 'center',
                                    padding: 10,
                                }}
                            >
                                <Text
                                    onPress={() =>
                                        (expertSession.status === 'ACCEPTED' || expertSession.status === 'DENIED')
                                            ? null
                                            : acceptDenySessionAction(
                                                expertSession.id,
                                                'ACCEPTED',
                                                setDisableButton,
                                                refetchExpertSessions
                                            )
                                    }
                                    style={[
                                        screenStyles.acceptText,
                                        (expertSession.status === 'ACCEPTED' || expertSession.status === 'DENIED') && {
                                            color: 'gray',
                                        },
                                    ]}
                                >
                                    Accept
                                </Text>
                            </View>

                            <View
                                style={{
                                    backgroundColor:
                                        expertSession.status === 'ACCEPTED' || expertSession.status === 'DENIED'
                                            ? '#ffd3d396' // faded/disabled look
                                            : '#fd999996',
                                    display: 'flex',
                                    height: '100%',
                                    justifyContent: 'center',
                                    padding: 10,
                                }}
                            >
                                <Text
                                    onPress={() =>
                                        (expertSession.status === 'ACCEPTED' || expertSession.status === 'DENIED')
                                            ? null
                                            : acceptDenySessionAction(
                                                expertSession.id,
                                                'DENIED',
                                                setDisableButton,
                                                refetchExpertSessions
                                            )
                                    }
                                    style={[
                                        screenStyles.declineText,
                                        (expertSession.status === 'ACCEPTED' || expertSession.status === 'DENIED') && {
                                            color: 'gray',
                                        },
                                    ]}
                                >
                                    Decline
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

export default AllSessionsBooked;