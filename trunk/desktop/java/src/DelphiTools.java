
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JOptionPane;

//import javax.imageio.*;

public class DelphiTools {
	/*
	 * Example usage:
	 * 
	 *   a := Random(x) --> a = DelphiTools.delphiRandom(x);
	 */
	public static int delphiRandom (int w){
		return (int) (Math.random()*w);	
		
		//int a=(int) (Math.random()*w);
		// return a;
	}
	
	public static BufferedImage getImage(String imagefile) {

        BufferedImage image = null;
        BufferedImage image_copy = null;

        try {

                image = javax.imageio.ImageIO.read(new java.io.File(imagefile));        
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

        } catch (Exception e) {

                        e.printStackTrace();

        }

        return image_copy;

	}
	
	public static void makeIco(String source, String dest){
		BufferedImage bmp;
		bmp = getImage(source);
		
        try {	
        	ICOEncoder.write(bmp, new File(dest));
        } catch (IOException e) {
        	e.printStackTrace();
        }
		
	}	
	
	public static void makeIco(String source16, String source32, String source48, String dest){
		List<BufferedImage> images = new ArrayList<BufferedImage>();
		images.add(getImage(source16));
		images.add(getImage(source32));
		images.add(getImage(source48));
		
        try {	
        	ICOEncoder.write(images, new File(dest));
        } catch (IOException e) {
        	e.printStackTrace();
        }
		
	}	
	
	public static void makeTransparentCopy(String source, String type, String dest){
		BufferedImage bmp;
		bmp = getImage(source);
        try {	
        	if (!javax.imageio.ImageIO.write(bmp, type, new File(dest))){
        		JOptionPane.showMessageDialog(null, "You won\n/nВи програли" );
        	}
        } catch (IOException e) {
        	e.printStackTrace();
        }
		
	}

	
}
