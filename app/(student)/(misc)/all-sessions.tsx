import { useGetExpertPeerProfiles } from '@/api/expert-peer/expert-peer';
import { Sessions, useAllSessionsByUserId } from '@/api/expert-peer/sessions';
import { formatDate } from '@/api/others';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const AllSessions = () => {
    const { session } = useAuth();
    const { data: sessionsByUserId, refetch: refetchSessionsByUserId } = useAllSessionsByUserId(session?.user.id ?? "");
    const { data: expertPeerDetails } = useGetExpertPeerProfiles();
    const [showPeer, setShowPeer] = useState<boolean>(false);
    return (
        <View>
            <Switch
                value={showPeer}
                onValueChange={async (value) => {
                    setShowPeer(value);
                }}
                trackColor={{ false: "grey", true: 'green' }}
                thumbColor={"lightblue"}
            />
            <Text>
                {showPeer === true ? "Showing peer slots" : "Showing expert slots"}
            </Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>S. No.</DataTable.Title>
                    <DataTable.Title>{
                        showPeer === true ? "Peer Faculty" : "Expert name"
                    }</DataTable.Title>
                    <DataTable.Title>Timing</DataTable.Title>
                    <DataTable.Title>Status</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>
                {
                    sessionsByUserId?.filter(s => s.group === (showPeer ? "PEER" : "EXPERT"))
                    .map((sessionByUserId: Sessions, index: number) => (
                        <DataTable.Row key={sessionByUserId.id}>
                            <DataTable.Cell>{index + 1}</DataTable.Cell>
                            <DataTable.Cell>
                                {showPeer
                                    ? expertPeerDetails?.find(d => d.group === "PEER")?.course ?? "Unknown course"
                                    : expertPeerDetails?.find(d => d.group === "EXPERT")?.full_name ?? "Unknown name"}
                            </DataTable.Cell>
                            <DataTable.Cell>
                                {`${formatDate(sessionByUserId.start_time)} - ${formatDate(sessionByUserId.end_time)}`}
                            </DataTable.Cell>
                            <DataTable.Cell>{sessionByUserId.status.toLowerCase()}</DataTable.Cell>
                            <DataTable.Cell
                                onPress={async () => {
                                    try {
                                        const { data, error } = await supabase
                                            .from("sessions")
                                            .delete()
                                            .eq("id", sessionByUserId.id);

                                        Toast.show({
                                            type: "success",
                                            text1: "Session deleted.",
                                            position: "bottom",
                                            visibilityTime: 1500,
                                        });
                                        refetchSessionsByUserId();
                                    } catch (error) {
                                        Toast.show({
                                            type: "error",
                                            text1: "Session couldn't be deleted.",
                                            position: "bottom",
                                            visibilityTime: 1500,
                                        });
                                        console.log(error);
                                    }
                                }}
                            >
                                Delete
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))
                }
            </DataTable>
        </View>
    );
}

export default AllSessions;