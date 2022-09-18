import styled from "styled-components";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.418);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: darkslateblue;
  width: 80vw;
`;
const ModalHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;
const ModalHeading = styled.h2``;
const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const ProductForm = styled.form`
  width: 80%;
`;
const ProductFormSubDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const ProductLabel = styled.label`
  flex: 1;
`;
const ProductInput = styled.input`
  flex: 2;
`;
const ProductDesc = styled.textarea``;
const SubmitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const SubmitButton = styled.button``;

const EditTableModal = () => {
  const [productInfo, setProductInfo] = useState({
    productTitle: undefined,
    productPrice: undefined,
    productDesc: undefined,
    productCategory: undefined,
  });
  const handleChange = (e) => {
    setProductInfo((prev) => ({ ...prev, [e.target.value]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };
  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalHeadingContainer>
          <ModalHeading>Edit Product</ModalHeading>
          <HighlightOffIcon
            style={{ position: "absolute", top: "10px", right: "10px" }}
          />
        </ModalHeadingContainer>
        <ProductContainer>
          <ProductForm>
            <ProductFormSubDiv>
              <ProductLabel htmlFor="productTitle">Title</ProductLabel>
              <ProductInput
                type="text"
                placeholder="Product Title"
                id="productTitle"
                name="productTitle"
                onChange={handleChange}
              />
            </ProductFormSubDiv>
            <ProductFormSubDiv>
              <ProductLabel htmlFor="productPrice">Price</ProductLabel>
              <ProductInput
                type="text"
                placeholder="Product Price"
                id="productPrice"
                name="productPrice"
                onChange={handleChange}
              />
            </ProductFormSubDiv>
            <ProductFormSubDiv>
              <ProductLabel htmlFor="productDesc">Description</ProductLabel>
              <ProductDesc
                cols={45}
                placeholder="Product Description"
                id="productDesc"
                name="productDesc"
                onChange={handleChange}
              />
            </ProductFormSubDiv>
            <ProductFormSubDiv>
              <ProductLabel htmlFor="productCategory">Category</ProductLabel>
              <ProductInput
                type="text"
                placeholder="Product Category"
                id="productCategory"
                name="productCategory"
                onChange={handleChange}
              />
            </ProductFormSubDiv>
          </ProductForm>
        </ProductContainer>
        <SubmitContainer>
          <SubmitButton onClick={handleClick}>Update Product</SubmitButton>
        </SubmitContainer>
      </ModalWrapper>
    </ModalContainer>
  );
};
export default EditTableModal;
