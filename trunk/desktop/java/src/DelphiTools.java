import java.awt.image.BufferedImage;
import java.io.InputStream;

public class DelphiTools {
   /*
    * Example usage:
    * 
    *   a := Random(x) --> a = DelphiTools.delphiRandom(x);
    */
   public static int delphiRandom (int w) {
      return (int) (Math.random()*w);
   }
   
   public static BufferedImage getImage(String imagefile) {
      BufferedImage image = null;
      BufferedImage image_copy = null;
    
      try {
         ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
         InputStream input = classLoader.getResourceAsStream(imagefile);
           
    
         image = javax.imageio.ImageIO.read(input);
         image_copy = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_ARGB);

         int trans = image.getRGB(0,0);
         final int width = image.getWidth();
         int[] imgData = new int[width];

         for (int y = 0; y < image.getHeight(); y++) {
            // fetch a line of data from each image
            image.getRGB(0, y, width, 1, imgData, 0, 1);

            for (int x = 0; x < width; x++)
               if (imgData[x] == trans)
                  imgData[x] &= 0x00FFFFFF;

            // replace the data
            image_copy.setRGB(0, y, width, 1, imgData, 0, 1);
         }                       
      } 
      catch (Exception e) {
         e.printStackTrace();
      }
      return image_copy;
   }

}
