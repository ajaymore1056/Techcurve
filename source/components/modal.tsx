import { Modal, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import CustomButton from './CustomButton';
import { useState } from 'react';

export const AlertModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
 
    const openModal = (content: string) => {
        setModalContent(content);
        setModalOpen(true);
    };
 
    const closeModal = () => {
        setModalOpen(false);
        setModalContent('');
    };

    return (
        <Modal animationType="slide" transparent={true} visible={modalOpen}>
            <View style={ModalContext_Style.modalViewParent}>
                <View style={ModalContext_Style.modalCard}>
                    <Text style={ModalContext_Style.textStyle}>{modalContent}</Text>
                    <CustomButton style={ModalContext_Style.okButton} textstyle={ModalContext_Style.okTextStyle} label={"Ok"} onPress={closeModal} />
                </View>
            </View>
        </Modal>
    );
}








export const ModalContext_Style = StyleSheet.create({
    modalViewParent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalCard: {
        paddingTop: 20,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.6,
        borderRadius: 6,
        backgroundColor: '#GHFGFF',
        elevation: 8,
        marginHorizontal: 15,
        paddingHorizontal: 15,
        borderColor: '#f12463',
        borderWidth: 1,
        paddingBottom: 15,
        width: widthPercentageToDP(80)
    },
    textStyle: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 15,
        fontWeight: '400',
    },
    okButton: {
        borderRadius: 10,
        marginHorizontal: 20,
        height: 40,
        alignSelf: 'center',
        width: widthPercentageToDP(40),
        marginTop: 20
    },
    okTextStyle: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        lineHeight: 30,
        // fontFamily: WorkSansBlack
    },
})