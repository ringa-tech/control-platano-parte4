using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Comenzando el programa de .NET");
            while (true)
            {
                //string movimiento = Console.ReadLine(); //0, -1, 1
                string entrada = Console.ReadLine();
                string[] datos = entrada.Split(',');
                string movimiento = datos[0];
                string brincar = datos[1];
                string acelerar = datos[2];

                //MARIO KART
                if (movimiento.Equals("0"))
                {
                    //No te muevas
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.RIGHT);
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.LEFT);
                }
                else if (movimiento.Equals("-1"))
                {
                    //Muevete a la izq
                    WindowsCrap.Press(WindowsCrap.ScanCodeShort.LEFT);
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.RIGHT);
                }
                else if (movimiento.Equals("1"))
                {
                    //Muevete a la der
                    WindowsCrap.Press(WindowsCrap.ScanCodeShort.RIGHT);
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.LEFT);
                }


                if (brincar.Equals("1"))
                {
                    WindowsCrap.Press(WindowsCrap.ScanCodeShort.KEY_A);
                }
                else
                {
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.KEY_A);
                }

                if (acelerar.Equals("1"))
                {
                    WindowsCrap.Press(WindowsCrap.ScanCodeShort.KEY_C);
                }
                else
                {
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.KEY_C);
                }

                /*
                //MARIO WORLD
                if (movimiento.Equals("0"))
                {
                    //No te muevas
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.RIGHT);
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.LEFT);
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.KEY_X);
                }
                else if (movimiento.Equals("-1"))
                {
                    //Muevete a la izq
                    WindowsCrap.Press(WindowsCrap.ScanCodeShort.LEFT);
                    WindowsCrap.Press(WindowsCrap.ScanCodeShort.KEY_X);
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.RIGHT);
                }
                else if (movimiento.Equals("1"))
                {
                    //Muevete a la der
                    WindowsCrap.Press(WindowsCrap.ScanCodeShort.RIGHT);
                    WindowsCrap.Press(WindowsCrap.ScanCodeShort.KEY_X);
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.LEFT);
                }


                if (brincar.Equals("1"))
                {
                    WindowsCrap.Press(WindowsCrap.ScanCodeShort.KEY_C);
                }
                else
                {
                    WindowsCrap.Release(WindowsCrap.ScanCodeShort.KEY_C);
                }*/
            }
        }
    }
}
