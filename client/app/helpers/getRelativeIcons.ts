
import outerlinkicon from "../../assets/outerlink.svg";
import fileicon from "../../assets/file-icon.svg";
import priceicon from "../../assets/price.svg";
import linkicon from "../../assets/link.svg";
import checkboxicon from "../../assets/checkbox.svg";
import dateicon from "../../assets/date.svg";
import documentsicon from "../../assets/documents.svg";
import addressicon from "../../assets/address.svg";
import emailicon from "../../assets/email.svg";
import cellicon from "../../assets/cell.svg";
import Aa from "../../assets/Aa.svg";

export const  getRelativeIcon = (iconType) => {
    switch (iconType) {
      case 'text':
        return Aa;
        break;
  
      case 'cell':
        return cellicon;
        break;
  
      case 'email':
        return emailicon;
        break;
  
      case 'address':
        return addressicon;
        break;
  
      case 'documents':
        return documentsicon;
        break;
  
      case 'date':
        return dateicon;
        break;
  
      case 'checkbox':
        return checkboxicon;
        break;
  
      case 'link':
        return linkicon;
        break;
  
      case 'outlink':
        return outerlinkicon;
        break;
  
      case 'price':
        return priceicon;
        break;
  
  
      case 'file':
        return fileicon;
        break;
  
      default:
        return Aa;
        break;
  
    }
  }
  