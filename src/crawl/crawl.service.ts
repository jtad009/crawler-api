import { Injectable } from '@nestjs/common';
import { Meta as M, Image } from './meta.entity';
import { parser, isUrl } from 'html-metadata-parser';
import axios from 'axios';
import { parse } from 'node-html-parser';
// import { setupCache } from 'axios-cache-adapter';

@Injectable()
export class CrawlService {
  async getUrlMeta(url: string): Promise<M> {
    const metaObject = new M();

    metaObject.id = 1;

    const result = await Promise.all([
      await this.getMetaFromUrl(url),
      await this.getHtml(url),
    ]);
    metaObject.description = result[0]['meta'].description;
    metaObject.title = result[0]['meta'].title;
    // if they are no images from the webpage  the get image from then meta-data if it exist
    if (Object.keys(result[1]).length) {
      metaObject.image = result[1];
    } else {
      metaObject.image = this.sortImageBySize(result[0]['og'].images);
    }

    return metaObject;
  }

  async getMetaFromUrl(url: string): Promise<any> {
    const cp = new Promise((resolve, reject) => {
      parser(url)
        .then((data) => {
          if (data) {
            resolve(data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
    return cp;
  }

  async getHtml(url: string): Promise<Image> {
    const api = axios.create({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36 OPR/68.0.3618.63',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    const images = [];

    // Send a GET request to some REST api
    const response = await api({
      url,
      method: 'get',
    });
    const data = parse(response.data);
    data.querySelectorAll('img').forEach((el) => {
      const src = this.getImageSrc(el);
      if (src && isUrl(src)) {
        const width = el.getAttribute('width');
        const height = el.getAttribute('height');
        const img: any = { url: src, width: 0, height: 0 };
        if (width) {
          img.width = parseInt(width, 10);
        }
        if (height) {
          img.height = parseInt(height, 10);
        }
        images.push(img);
      }
    });
    return this.sortImageBySize(images);
  }

  getImageSrc(img: any): string {
    if (isUrl(img.getAttribute('src'))) {
      return img.getAttribute('src');
    }
    if (isUrl(img.getAttribute('data-lazy-src'))) {
      return img.getAttribute('data-lazy-src');
    }
  }

  sortImageBySize(list: any[]): Image {
    const image = list.sort((a, b) =>
      a.width > b.width && a.height > b.height ? -1 : 1,
    );
    const largestImage = new Image();
    console.log(image.length);
    if (image.length) {
      largestImage.url = image[0]['url'];
      largestImage.width = image[0]['width'];
      largestImage.height = image[0]['height'];
    }

    return largestImage;
  }
}
