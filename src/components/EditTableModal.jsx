import styled from "styled-components";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import { useContext } from "react";
import { TableContext } from "../context/TableContext";

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(72, 69, 69, 0.03);
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
  width: 48.5vw;
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
  display: flex;
  justify-content: center;
  flex-direction: column;
}
`;
const ProductFormSubDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;
const LabelDiv = styled.div`
  flex: 1;
`;
const InputDiv = styled.div`
  flex: 3;
`;
const ProductLabel = styled.label``;
const ProductInput = styled.input`
  width: 100%;
`;
const ProductDesc = styled.textarea`
  width: 100%;
`;
const SubmitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const SubmitButton = styled.button`
  padding: 7px 20px;
  border-radius: 10px;
  outline: none;
  border: none;
  font-size: 1em;
  font-weight: 600;
  background: #7b85cb;
  &:hover {
    background: #646fd4;
    box-shadow: 0px 0px 10px 1px #ffffff;
  }
`;

const EditTableModal = ({ productId, setOpen }) => {
  const { tableData, dispatch } = useContext(TableContext);
  const [productInfo, setProductInfo] = useState({
    productTitle: undefined,
    productPrice: undefined,
    productDesc: undefined,
    productCategory: undefined,
  });
  const handleChange = (e) => {
    setProductInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    for (let i = 0; i < tableData.length; i++) {
      //target the object having the same product id
      if (tableData[i].id === productId) {
        tableData[i].title = productInfo.productTitle;
        tableData[i].price = productInfo.productPrice;
        tableData[i].description = productInfo.productDesc;
        tableData[i].category.name = productInfo.productCategory;
      }
    }
    // update the data for that object
    //dispatch the updated object

    try {
      dispatch({ type: "TABLE_DATA_EDIT_SUCCESS", payload: tableData });
      setOpen(false);
    } catch (error) {}
  };
  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalHeadingContainer>
          <ModalHeading>Edit Product - ID: {productId}</ModalHeading>
          <HighlightOffIcon
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() => setOpen(false)}
          />
        </ModalHeadingContainer>
        <ProductContainer>
          <ProductForm>
            <ProductFormSubDiv>
              <LabelDiv>
                <ProductLabel htmlFor="productTitle">Title</ProductLabel>
              </LabelDiv>
              <InputDiv>
                <ProductInput
                  type="text"
                  placeholder="Product Title"
                  id="productTitle"
                  name="productTitle"
                  onChange={handleChange}
                />
              </InputDiv>
            </ProductFormSubDiv>
            <ProductFormSubDiv>
              <LabelDiv>
                <ProductLabel htmlFor="productPrice">Price</ProductLabel>
              </LabelDiv>
              <InputDiv>
                <ProductInput
                  type="text"
                  placeholder="Product Price"
                  id="productPrice"
                  name="productPrice"
                  onChange={handleChange}
                />
              </InputDiv>
            </ProductFormSubDiv>
            <ProductFormSubDiv>
              <LabelDiv>
                <ProductLabel htmlFor="productDesc">Description</ProductLabel>
              </LabelDiv>
              <InputDiv>
                <ProductDesc
                  cols={45}
                  placeholder="Product Description"
                  id="productDesc"
                  name="productDesc"
                  onChange={handleChange}
                />
              </InputDiv>
            </ProductFormSubDiv>
            <ProductFormSubDiv>
              <LabelDiv>
                <ProductLabel htmlFor="productCategory">Category</ProductLabel>
              </LabelDiv>
              <InputDiv>
                <ProductInput
                  type="text"
                  placeholder="Product Category"
                  id="productCategory"
                  name="productCategory"
                  onChange={handleChange}
                />
              </InputDiv>
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
