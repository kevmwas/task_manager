package com.manager.task_manager;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Constants {

    public static String generateSecretKey() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA512");
            keyGen.init(512);
            SecretKey secretKey = keyGen.generateKey();
            return Base64.getEncoder().encodeToString(secretKey.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to generate secret key", e);
        }
    }

    public static final String API_SECRET_KEY = "this key might as well as be the one for users";

    public static final String ADMIN_SECRET_KEY = "for this is the key for all";

    // token valid for 48 hrs
    public static final long TOKEN_VALIDITY = 720L * 60 * 60 * 1000;

    public static final String ID_SECRET_KEY = "this encrypts my ids to fit me";
}
