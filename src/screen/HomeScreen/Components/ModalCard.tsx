import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Car } from '../HomeScreen';
import { styles } from '../../../Theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from '../../../commons/commons';

interface Props {
    isVisible: boolean;
    setShowModal: () => void;
    car: Car[];
    onPurchase: () => void;
}

export const ModalCard = ({ isVisible, car, setShowModal, onPurchase }: Props) => {
    const { width } = useWindowDimensions();

    // Función para calcular el total a pagar
    const totalPay = (): number => {
        let total: number = 0;
        car.forEach(product => {
            total += product.price * product.totalQuantity;
        });
        return total;
    };

    // Función para calcular el descuento del 20%
    const calculateDiscount = (): number => {
        const totalItems = car.reduce((sum, product) => sum + product.totalQuantity, 0);
        return totalItems > 4 ? totalPay() * 0.20 : 0; 
    };

    // Función para calcular el total con descuento
    const totalWithDiscount = (): number => {
        return totalPay() - calculateDiscount();
    };

    // Función para manejar la compra
    const handleSendInfo = () => {
        // Llamar a la función onPurchase para vaciar el carrito
        onPurchase();
        // Cerrar el modal
        setShowModal();
    };

    return (
        <Modal visible={isVisible} animationType='fade' transparent={true}>
            <View style={styles.contentPrincipal}>
                <View style={{
                    ...styles.contentModal,
                    width: width * 0.80
                }}>
                    <View style={styles.headModal}>
                        <Text style={styles.titleModal}>Mis Productos</Text>
                        <View style={styles.iconCard}>
                            <Icon
                                name='cancel'
                                size={25}
                                color={PRIMARY_COLOR}
                                onPress={setShowModal}
                            />
                        </View>
                    </View>
                    <View style={styles.headerTable}>
                        <Text style={styles.textInformation}>Producto.Kawasaki</Text>
                        <View style={styles.headerInfotmation}>
                            <Text style={{ ...styles.textInformation, marginHorizontal: 10 }}>Prec.</Text>
                            <Text style={{ ...styles.textInformation, marginHorizontal: 10 }}>Cant.</Text>
                            <Text style={{ ...styles.textInformation, marginHorizontal: 10 }}>Total.</Text>
                        </View>
                    </View>
                    <FlatList
                        data={car}
                        renderItem={({ item }) =>
                            <View style={styles.headerTable}>
                                <Text>{item.name}</Text>
                                <View style={styles.headerInfotmation}>
                                    <Text style={{ marginHorizontal: 10 }}>
                                        {item.price.toFixed(3)}
                                    </Text>
                                    <Text style={{ marginHorizontal: 27 }}>
                                        {item.totalQuantity}
                                    </Text>
                                    <Text style={{ marginHorizontal: 2 }}>
                                        {(item.price * item.totalQuantity).toFixed(3)}
                                    </Text>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item.id.toString()}
                    />
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.textTotalPay}>Total apagar: ${totalPay().toFixed(3)}</Text>
                        {calculateDiscount() > 0 && (
                            <Text style={styles.textDiscount}>Descuento 20%: -${calculateDiscount().toFixed(3)}</Text>
                        )}
                        <Text style={styles.textTotalPay}>Total con Descuento: ${totalWithDiscount().toFixed(3)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleSendInfo}
                        style={styles.buttonAddCar}>
                        <Text style={styles.textButtonAddCar}>Realizar Compra</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
