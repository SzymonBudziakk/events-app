package events_app.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "e0038a5ae75600c63ec1ae2bf370530e1227519d887627509fc639bb3fabe2300b9717d2def8bfc007f2e13611b1195614280d922bd98c885797c39296072731904006303065eb19ef5b903781bd74acf4133942be22340a0b965c4a90909428b0cb44a4dfd84ce97fa4ca4ac4e71ac33f242742ab85d92b329a6b104d0e6b85a189ef45a3f75e32db496c97865929c387eddc9849942cacb13d6716cf511d2b00f1ed6c417e020c4b866617938a4e1309170d1efac00fd44f3189757461eb16991376337057a824a897ffa6e43890d45ffbcec6ee3e5a39f400f39eff2bfe146e902777548e402e82a1210593d0f62aab41936839522a3e6a159376144cd65b";

    public String extractUsername(String token) {
        return null;
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
