import { createContext, useContext, useState } from 'react';

// Definisci i tipi per i dati del prodotto, magazzino e fornitore
interface FornitoreData {
  nomeFornitore: string;
  codiceFornitore: string;
  data: string;
  emailFornitore: string;
  telefonoFornitore: string;
}

interface ProductData {
  prodotto: {
    nomeProdotto: string;
    sku: string;
    categoria: string;
    descrizione: string;
    prezzoAcquisto: string;
    prezzoVendita: string;
    iva: string;
  };
  magazzino: {
    quantita: string;
    quantitaMinima: string;
  };
  fornitore: FornitoreData;
}

interface Product {
  id: number;
  sku: string;
  name: string;
  image: string;
  quantity: number;
  status: string;
}

// Definisci il tipo per il contesto
interface ProductContextType {
  productData: ProductData;
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>;
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void; // Add this line
}

// Crea il contesto
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider per il contesto
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productData, setProductData] = useState<ProductData>({
    prodotto: {
      nomeProdotto: '',
      sku: '',
      categoria: '',
      descrizione: '',
      prezzoAcquisto: '',
      prezzoVendita: '',
      iva: '',
    },
    magazzino: {
      quantita: '',
      quantitaMinima: '',
    },
    fornitore: {
      nomeFornitore: '',
      codiceFornitore: '',
      data: '',
      emailFornitore: '',
      telefonoFornitore: '',
    }
  });

  const [products, setProducts] = useState<Product[]>([
    { id: 1, sku: 'SKU123', name: 'Prodotto A', image: 'https://placehold.co/100x100', quantity: 10, status: 'available' },
    { id: 2, sku: 'SKU456', name: 'Prodotto B', image: 'https://placehold.co/100x100', quantity: 0, status: 'out_of_stock' },
    { id: 3, sku: 'SKU789', name: 'Prodotto C', image: 'https://placehold.co/100x100', quantity: 2, status: 'low_stock' },
  ]);

  const addProduct = (formData: ProductData) => {
    const newProduct: Product = {
      id: Date.now(),
      sku: formData.prodotto.sku,
      name: formData.prodotto.nomeProdotto,
      image: 'https://placehold.co/100x100',
      quantity: parseInt(formData.magazzino.quantita) || 0,
      status: parseInt(formData.magazzino.quantita) > parseInt(formData.magazzino.quantitaMinima) 
        ? 'available' 
        : parseInt(formData.magazzino.quantita) === 0 
          ? 'out_of_stock' 
          : 'low_stock',
    };

    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const deleteProduct = (productId: number) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ productData, setProductData, products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalizzato per utilizzare il contesto
export const useProductData = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductData deve essere utilizzato all\'interno di un ProductProvider');
  }
  return context;
};