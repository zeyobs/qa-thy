Feature: Uçuş Arama

    Scenario: Başarılı Uçuş Arama
    Given Kullanıcı Turkish Airlines anasayfasındadır
    When Kullanıcı iki şehir arası uçuş arar
    Then Uçuş sonuçlarını görüntülenir

    Scenario: Başarılı Uçuş Arama
    Given Kullanıcı Turkish Airlines anasayfasındadır
    When Kullanıcı yetişkin sayısından fazla bebek yolcu ekler
    Then Bebek yolcuların yetişkin sayısından fazla olamayacağına dair uyarı görüntülenir

    Scenario: Kalkış ve Varış Parkurunun Aynı Olması
    Given Kullanıcı Turkish Airlines anasayfasındadır
    When Kullanıcı kalkış ve varış olarak aynı parkuru seçer
    Then Kalkış ve varış parkurunun aynı olamayacağına dair uyarı görüntülenir

    Scenario: Koltuk Seçimi
    Given Kullanıcı Turkish Airlines anasayfasındadır
    When Kullanıcı uçuş seçer ve koltuk seçimi yapar
    Then Koltuk seçimi başarılı bir şekilde gerçekleşir

    Scenario: Uçuş Durumu Görüntüleme
    Given Kullanıcı Turkish Airlines anasayfasındadır
    When Kullanıcı uçuş durumu menüsünde uçuş bilgileri ile arama yapar 
    Then Uçuş durumu ekranında güzergah, kalkış ve varış saati, uçuş süresi bilgileri görüntülenir


