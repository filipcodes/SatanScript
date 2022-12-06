package app;

import java.util.ArrayList;

class Main {
  // define databašes
  static ArrayList<Integer> idBookBase = new ArrayList<Integer>();
  static ArrayList<Integer> idUserBase = new ArrayList<Integer>();

  static ArrayList<Book> Books = new ArrayList<Book>();

  // main function to create objects
  public static void main(String[] args) {
    Book[] arr;
    arr = new Book[2];
    Books.add(new Book("No One Writes To The Colonel", getIdforBook()));
    Books.add(new Book("Six Thinking Hats", getIdforBook()));

    Book bookNWC = new Book("No One Writes To The Colonel", getIdforBook());
    Book bookSTH = new Book("Six Thinking Hats", getIdforBook());
    Reader readerAB = new Reader("Artem Belkov", "belk.arte68@gmail.com", getIdforPerson());
    Reader readerIB = new Reader("Ilja Boldyrev", "ilja@gmail.com", getIdforPerson());

    Books.get(1).display();
  }

  public static Integer getIdforBook() { // Generating a uniue ID for a book

    boolean i = true;
    int a = 0;

    while (i == true) {
      a = (int) ((Math.random() * (19999 - 10000)) + 10000); // generating random ID for a book
      if (idBookBase.contains(a)) {
      } else {
        idBookBase.add(a);
        i = false;
      }
    }
    return a;
  }

  public static Integer getIdforPerson() { // Generating a uniue ID for a person

    boolean i = true;
    int a = 0;

    while (i == true) {
      a = (int) ((Math.random() * (1999 - 1000)) + 1000); // generating random ID for a person
      if (idUserBase.contains(a)) {
        getIdforPerson();
      } else {
        idUserBase.add(a);
        i = false;
      }
    }
    return a;
  }
}
