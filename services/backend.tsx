import { featureFlags } from '@/models/config';
import { FinancialsProps } from "@/models/financials";
import axios from 'axios';
import { ProductAttribute, ProductProps } from "../models/products";


export class BackEndService {

static URL = featureFlags.isReadOnly 
  ? 'https://lbc-scrapper-server.vercel.app/'
  : 'http://127.0.0.1:5002';

static api = axios.create({
  baseURL: BackEndService.URL,
  //timeout: 25000,
});

  static searchItems = async (url: string) => {

    const { data } = await BackEndService.api.get('/api/searchitems', {
    params: {
        url: url
      }
    });
    const products = data as ProductProps[];
    return {
      'data': products,
    }
  };

  static readItems = async (tempAds: string) => {
    const { data } = await BackEndService.api.get('/api/colddata', {
      params :{
        tempAds: tempAds
      }
    });
    const products = data as ProductProps[];
    return {
      'data': products,
    }
  };

  static getNextPage = async (url: string) => {
    const { data } = await BackEndService.api.get('/api/next_page', {
      params: {
        url: url
      }
    });
    const products = data as ProductProps[];

    return {
      'data': products,
      'next': data['meta']['next']
    }
  };
  static getDetailledProduct = async (url: string) => {
    const { data } = await BackEndService.api.get('/api/getitem', {
      params: {
        url: url
      }
    });
    return data as ProductProps;
  };

  static getAIAnalysis = async (description: string, feature: ProductAttribute[]) => {
    const { data } = await BackEndService.api.post('/api/ai_analysis', {
        description: description,
        features: feature
    }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    //console.log(data)
    return {
        'data': data['analysis'] as string,
        'financials': data['financials'] as FinancialsProps[]
    }
  }
  static removeColdProduct = async (url: string) => {
    const { data } = await BackEndService.api.delete('/api/removecolddata', {
      params: {
        url: url
      }
    });
  };
  static saveProduct = async (item: ProductProps) => {
    const { data } = await BackEndService.api.post('/api/saveitem',  {
        item: item
    },{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    return data
  };

    static autoSearch = async () => {
    const { data } = await BackEndService.api.get('/api/autosearch', {
    });
  };

}