import { Product } from '../types/product';

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Bicicleta Montañera Elite',
        description: 'Bicicleta de montaña con marco de aluminio, suspensión delantera y 21 velocidades. Ideal para terrenos irregulares y senderos de montaña. Incluye frenos de disco hidráulicos para una frenada segura en cualquier condición.',
        price: 1299000,
        imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        stock: 15,
        isBestSeller: true
    },
    {
        id: 2,
        name: 'Bicicleta Urbana Clásica',
        description: 'Bicicleta urbana con estilo retro, ideal para desplazamientos diarios en la ciudad. Marco ligero de acero, asiento cómodo y manubrio ergonómico para una postura relajada durante tus recorridos urbanos.',
        price: 850000,
        imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        stock: 8,
        isBestSeller: false
    },
    {
        id: 3,
        name: 'Bicicleta Plegable Compacta',
        description: 'Bicicleta plegable ligera y compacta, perfecta para combinar con transporte público. Se pliega en segundos y ocupa un espacio mínimo para guardarla en casa o llevarla en el transporte. Perfecta para trayectos mixtos.',
        price: 750000,
        imageUrl: 'https://images.unsplash.com/photo-1583087253076-6de06c243071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
        stock: 12,
        isBestSeller: true
    },
    {
        id: 4,
        name: 'Bicicleta de Ruta Profesional',
        description: 'Bicicleta de carretera con marco de carbono, grupos Shimano Ultegra y ruedas aerodinámicas. Diseñada para competiciones de alto nivel y para ciclistas exigentes que buscan velocidad y rendimiento en cada pedalada.',
        price: 3200000,
        imageUrl: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        stock: 5,
        isBestSeller: false
    },
    {
        id: 5,
        name: 'Bicicleta Eléctrica City',
        description: 'Bicicleta eléctrica con batería de larga duración, perfecta para recorridos urbanos sin esfuerzo. Motor potente de 250W con autonomía de hasta 80km. Incluye luces integradas, guardabarros y portaequipajes.',
        price: 2500000,
        imageUrl: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        stock: 3,
        isBestSeller: true
    },
    {
        id: 6,
        name: 'Bicicleta BMX Freestyle',
        description: 'Bicicleta BMX diseñada para realizar trucos y acrobacias. Construcción resistente con cuadro de acero reforzado y componentes duraderos para soportar el uso intensivo en skateparks o street.',
        price: 950000,
        imageUrl: 'https://images.unsplash.com/photo-1583667614680-82c248862fa3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        stock: 7,
        isBestSeller: false
    }
];

export default mockProducts;