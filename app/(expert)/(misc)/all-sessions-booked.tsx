import { useGetExpertSessions, useStudentProfilesByExpert } from '@/api/expert-peer/expert-peer';
import { Sessions } from '@/api/expert-peer/sessions';
import { formatDate } from '@/api/others';
import NewButton from '@/components/NewButton';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useState } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

const AllSessionsBooked = () => {
    const { session } = useAuth();
    const { data: expertSessions, refetch: refetchExpertSessions } = useGetExpertSessions(session?.user.id ?? "");
    const { data: studentProfiles } = useStudentProfilesByExpert(session?.user.id ?? "");
    const [disableButton, setDisableButton] = useState<boolean>(false);
    
    return (
        <View>
            {expertSessions?.map((expertSession: Sessions, index: number) => {
                const student = studentProfiles?.find(
                    (profile) => profile.id === expertSession.student_id
                );

                return (
                    <View key={index} style={{ marginBottom: 12 }}>
                        <Text>
                            {formatDate(expertSession.start_time)} – {formatDate(expertSession.end_time)}
                        </Text>
                        <Text>Status: {expertSession.status}</Text>
                        <Text>
                            Student name: {student ? student.full_name ?? student.name ?? 'Unknown' : 'Loading…'}
                        </Text>

                        <View style={{ flexDirection: 'row'}}>
                            <NewButton title="Accept session" disabled={disableButton} onPress={async() => { 
                                setDisableButton(true);
                                try {
                                    const {data, error} = await supabase.from("sessions").update({"status": "ACCEPTED"}).eq("id", expertSession.id);
                                    console.log(data);
                                    Toast.show({
                                        type: 'success', // 'success' | 'error' | 'info'
                                        text1: 'Added session successfully',
                                        position: 'bottom', // or 'bottom'
                                        visibilityTime: 1500
                                    });
                                } 
                                catch (error ){
                                    console.log(error);
                                    Toast.show({
                                        type: 'error', // 'success' | 'error' | 'info'
                                        text1: 'Could not accept the session.',
                                        position: 'bottom', // or 'bottom'
                                        visibilityTime: 1500
                                    });
                                }
                                setDisableButton(false);
                                refetchExpertSessions();
                            }} />
                            <NewButton title="Decline session" disabled={disableButton}
                                onPress={async() => { 
                                    setDisableButton(true);
                                    try {
                                        const {data, error} = await supabase.from("sessions").update({"status": "DENIED"}).eq("id", expertSession.id);
                                        console.log(data);
                                        Toast.show({
                                            type: 'success', // 'success' | 'error' | 'info'
                                            text1: 'Denied session successfully',
                                            position: 'bottom', // or 'bottom'
                                            visibilityTime: 1500
                                        });
                                    } 
                                    catch (error ){
                                        console.log(error);
                                        Toast.show({
                                            type: 'error', // 'success' | 'error' | 'info'
                                            text1: 'Could not accept the session.',
                                            position: 'bottom', // or 'bottom'
                                            visibilityTime: 1500
                                        });
                                    }
                                    setDisableButton(false);
                                    refetchExpertSessions();
                                }}
                            />
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

export default AllSessionsBooked;